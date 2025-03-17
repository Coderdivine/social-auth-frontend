import axios from "axios";
const BEARER_TOKEN = process.env.REACT_APP_X_BEARER_TOKEN;

// X API v2 base URL
const xAPI = axios.create({
  baseURL: "https://api.x.com/2",
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

// async function checkRetweet(tweetId, userId) {
//   try {
//     // GET /tweets/:id/retweeted_by endpoint
//     const response = await xAPI.get(`/tweets/${tweetId}/retweeted_by`, {
//       params: { max_results: 100 },
//     });
//     const retweeters = response.data.data || [];
//     return retweeters.some((user) => user.id === userId);
//   } catch (error) {
//     console.error("Error checking retweet:", error.response?.data || error);
//     return false;
//   }
// }

async function checkFollow(userId, targetUserId) {
  try {
    // GET /users/:id/following endpoint
    const response = await xAPI.get(`/users/${userId}/following`, {
      params: { max_results: 1000 },
    });
    const following = response.data.data || [];
    return following.some((user) => user.id === targetUserId);
  } catch (error) {
    console.error("Error checking follow:", error.response?.data || error);
    return false;
  }
}

async function checkSmartFollower(userId, minFollowers = 50) {
  try {
    // GET /users/:id endpoint to retrieve user details including public_metrics
    const response = await xAPI.get(`/users/${userId}`, {
      params: {
        "user.fields": "public_metrics,created_at,verified",
      },
    });
    const user = response.data.data;
    if (!user) return false;
    const followersCount = user.public_metrics?.followers_count || 0;
    // You can add more conditions here (e.g., account age, verified status) to better filter bots.
    return followersCount >= minFollowers;
  } catch (error) {
    console.error(
      "Error checking smart follower:",
      error.response?.data || error
    );
    return false;
  }
}

async function verifyUserActions(
  userId,
  farmingTweetId,
  farmingProtocolId,
  minFollowers = 50
) {
  const hasRetweeted = await checkRetweet(farmingTweetId, userId);
  const isFollowing = await checkFollow(userId, farmingProtocolId);
  const isSmartFollower = await checkSmartFollower(userId, minFollowers);

  return {
    hasRetweeted,
    isFollowing,
    isSmartFollower,
  };
}

async function checkRetweet(tweetId, userId) {
  try {
    let params = { max_results: 100 };
    let nextToken = null;

    do {
      if (nextToken) {
        params.pagination_token = nextToken;
      }
      // GET /tweets/:id/retweeted_by endpoint with pagination support
      const response = await xAPI.get(`/tweets/${tweetId}/retweeted_by`, {
        params,
      });
      const retweeters = response.data.data || [];

      if (retweeters.some((user) => user.id === userId)) {
        return true;
      }

      nextToken = response.data.meta?.next_token;
    } while (nextToken);

    return false;
  } catch (error) {
    console.error("Error checking retweet:", error.response?.data || error);
    return false;
  }
}

export {  checkRetweet, checkFollow, checkSmartFollower, verifyUserActions }
