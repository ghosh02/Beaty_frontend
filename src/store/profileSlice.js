import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  password: '',
  agreeToTerms: false,
  phoneNumber: '',
  profileImage: 'https://via.placeholder.com/100',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const {username, email, phoneNumber, profileImage} = action.payload;
      state.username = username;
      state.phoneNumber = phoneNumber;
      state.email = email;
      state.profileImage = profileImage;
    },
    setSignupData: (state, action) => {
      const {username, phoneNumber, email, password, agreeToTerms} =
        action.payload;
      state.username = username;
      state.phoneNumber = phoneNumber;
      state.email = email;
      state.password = password;
      state.agreeToTerms = agreeToTerms;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    resetProfileData: () => initialState,
  },
});

export const {
  setProfileData,
  setSignupData,
  updateProfileImage,
  resetProfileData,
} = profileSlice.actions;
export default profileSlice.reducer;
