import profileImage from '../icons/profile-mando.png'

const state = {
    profile: {
      username: 'michalamet',
      email: 'user@example.com',
      bio: '귀여운게 최고야',
      profileImage: profileImage,
      height: '165',
      weight: '45'
    },
    loading: false,
    error: null
  };
  
  const mutations = {
    SET_PROFILE(state, profile) {
      state.profile = profile;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    UPDATE_PROFILE(state, updates) {
      state.profile = { ...state.profile, ...updates };
    }
  };
  
  const actions = {
    // 백엔드 요청 없이 로컬 데이터 사용
    async fetchProfile({ commit }) {
      commit('SET_LOADING', true);
      try {
        // 1초 후에 프로필 데이터 설정 (비동기 작업 시뮬레이션)
        setTimeout(() => {
          commit('SET_PROFILE', state.profile);
          commit('SET_LOADING', false);
        }, 300);
        return { success: true };
      } catch (error) {
        commit('SET_ERROR', '프로필을 불러오는 중 오류가 발생했습니다.');
        commit('SET_LOADING', false);
        return { success: false, error: '프로필을 불러오는 중 오류가 발생했습니다.' };
      }
    },
  
    // 프로필 정보 업데이트 (로컬)
    async updateProfile({ commit }, profileData) {
      commit('SET_LOADING', true);
      try {
        // 업데이트 시뮬레이션
        setTimeout(() => {
          commit('UPDATE_PROFILE', profileData);
          commit('SET_LOADING', false);
        }, 300);
        return { success: true };
      } catch (error) {
        commit('SET_ERROR', '프로필 업데이트 중 오류가 발생했습니다.');
        commit('SET_LOADING', false);
        return { success: false, error: '프로필 업데이트 중 오류가 발생했습니다.' };
      }
    },
  
    // 프로필 이미지 업데이트 (로컬)
    async updateProfileImage({ commit }, imageFile) {
      commit('SET_LOADING', true);
      try {
        // 로컬에서 이미지 URL 생성 
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        
        reader.onload = () => {
          commit('UPDATE_PROFILE', { profileImage: reader.result });
          commit('SET_LOADING', false);
        };
        
        return { success: true };
      } catch (error) {
        commit('SET_ERROR', '이미지 업로드 중 오류가 발생했습니다.');
        commit('SET_LOADING', false);
        return { success: false, error: '이미지 업로드 중 오류가 발생했습니다.' };
      }
    }
  };
  
  const getters = {
    getProfile: state => state.profile,
    isLoading: state => state.loading,
    getError: state => state.error
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };