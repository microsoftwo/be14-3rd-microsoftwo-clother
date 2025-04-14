// API 기본 URL 설정
const API_BASE_URL = "http://localhost:8000/core-service"; // 게시판 서버
const USER_API_URL = "http://localhost:8000/user-service"; // 유저 서버

// 인증 토큰 가져오기
const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  console.log("Token from localStorage:", token); // 실제 토큰 값 출력
  return token;
};

// API 요청 시 사용할 기본 옵션
const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

// 인증 헤더 추가
const getOptionsWithAuth = () => {
  const token = getAuthToken();
  console.log("Token being used:", token);

  if (!token) {
    console.warn("No token found in localStorage");
    return defaultOptions;
  }

  const options = {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("Request options:", {
    ...options,
    headers: {
      ...options.headers,
      Authorization: "Bearer [TOKEN]", // 로그에서는 실제 토큰 값 숨김
    },
  });

  return options;
};

// 게시물 관련 API
export const boardAPI = {
  // 최신순 조회
  getNewestBoards: async () => {
    try {
      console.log("Fetching newest boards...");
      const response = await fetch(
        `${API_BASE_URL}/boards`,
        getOptionsWithAuth()
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch boards: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getNewestBoards:", error);
      throw error;
    }
  },

  // 좋아요순 조회
  getLikeBoards: async () => {
    try {
      console.log("Fetching boards by likes...");
      const response = await fetch(
        `${API_BASE_URL}/boards?sortBy=like`,
        getOptionsWithAuth()
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to fetch boards by like: ${response.status}`
        );
      }
      const data = await response.json();
      console.log("Received boards data:", data);
      return data;
    } catch (error) {
      console.error("Error in getLikeBoards:", error);
      throw error;
    }
  },

  // 단건 조회
  getBoard: async (id) => {
    try {
      console.log("Fetching board with id:", id);
      const response = await fetch(
        `${API_BASE_URL}/boards/${id}`,
        getOptionsWithAuth()
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Please login first");
        }
        throw new Error(`Failed to fetch board: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error in getBoard:", error);
      throw error;
    }
  },

  // 좋아요 토글
  toggleLike: async (boardId, userId) => {
    try {
      console.log("Toggling like for board:", boardId, "by user:", userId);
      const response = await fetch(`${USER_API_URL}/like`, {
        ...getOptionsWithAuth(),
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          boardId: boardId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to toggle like: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Like toggle response:", data);
      return data;
    } catch (error) {
      console.error("Error in toggleLike:", error);
      throw error;
    }
  },

  // 게시물 검색
  searchBoards: async (keyword, sortBy = "title+content") => {
    try {
      console.log("Searching boards with keyword:", keyword, "sortBy:", sortBy);
      const response = await fetch(
        `${API_BASE_URL}/boards/search?keyword=${encodeURIComponent(
          keyword
        )}&sortBy=${encodeURIComponent(sortBy)}`,
        getOptionsWithAuth()
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Search response error:", errorText);
        throw new Error(`Failed to search boards: ${response.status}`);
      }

      const data = await response.json();
      console.log("Search results:", data);
      return data;
    } catch (error) {
      console.error("Error searching boards:", error);
      throw error;
    }
  },

  getBoardDetail: async (postId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/boards/${postId}`,
        getOptionsWithAuth()
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch board detail: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching board detail:", error);
      throw error;
    }
  },

  async getPosts(page = 1) {
    try {
      console.log("Fetching posts for page:", page);
      const response = await fetch(
        `${API_BASE_URL}/boards?page=${page - 1}&size=12`,
        getOptionsWithAuth()
      );
      console.log("Posts response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Posts data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};

export const postAPI = {
  // 모든 게시물 가져오기
  getAllPosts: async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts`,
        getOptionsWithAuth()
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  // 특정 게시물 가져오기
  getPost: async (postId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}`,
        getOptionsWithAuth()
      );
      if (!response.ok) throw new Error("Failed to fetch post");
      return await response.json();
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

  // 좋아요 상태 가져오기
  getLikeStatus: async (postId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/posts/${postId}/likes`,
        getOptionsWithAuth()
      );
      if (!response.ok) throw new Error("Failed to fetch like status");
      return await response.json();
    } catch (error) {
      console.error("Error fetching like status:", error);
      throw error;
    }
  },

  // 좋아요 토글
  toggleLike: async (postId, isLiked) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/likes`, {
        ...getOptionsWithAuth(),
        method: isLiked ? "DELETE" : "POST",
      });
      if (!response.ok) throw new Error("Failed to toggle like");
      return await response.json();
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },
};

export const userAPI = {
  // 로그인
  // login: async (email, password) => {
  //   try {
  //     console.log("=== Login Request Start ===");
  //     console.log("Login attempt with:", { email });

  //     const response = await fetch(`${USER_API_URL}/auth/login`, {
  //       ...defaultOptions,
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const responseData = await response.text();
  //     console.log("Raw response data:", responseData);

  //     if (!response.ok) {
  //       throw new Error(
  //         `Login failed: ${response.status}\nResponse: ${responseData}`
  //       );
  //     }

  //     const data = JSON.parse(responseData);

  //     if (data.token) {
  //       localStorage.setItem("accessToken", data.token);
  //     } else if (data.accessToken) {
  //       localStorage.setItem("accessToken", data.accessToken);
  //     } else {
  //       throw new Error("No token in response");
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error("Login process failed:", error);
  //     throw error;
  //   }
  // },

  // // 로그아웃
  // logout: () => {
  //   localStorage.removeItem("accessToken");
  // },

  // 특정유저 정보 가져오기
  getUser: async (userId) => {
    try {
      console.log("Fetching user info for userId:", userId);
      const options = getOptionsWithAuth();
      const url = `${USER_API_URL}/user/${userId}`;
      console.log("Full request details:", {
        url,
        method: "GET",
        headers: options.headers,
      });

      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 401) {
          // 응답 내용도 확인
          const errorText = await response.text();
          console.error("401 Error response:", errorText);
          throw new Error("인증이 필요합니다. 다시 로그인해주세요.");
        }
        throw new Error(`Failed to fetch user info: ${response.status}`);
      }

      const userInfo = await response.json();
      console.log("User info response:", userInfo);

      // 필요한 정보만 반환하고, height와 weight는 값이 있을 때만 포함
      const result = {
        nickname: userInfo.nickname,
        imageUrl: userInfo.imageUrl || "/default-profile.png",
      };

      // height와 weight가 있을 때만 추가
      if (userInfo.height) {
        result.height = userInfo.height;
      }
      if (userInfo.weight) {
        result.weight = userInfo.weight;
      }

      return result;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  },

  // 내 정보 조회
  // async getUserInfo() {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     throw new Error("No access token found");
  //   }

  //   const response = await fetch(`${USER_API_URL}/user/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch user info");
  //   }

  //   return response.json();
  // },
};
