# RingnBring-project
Create a sharing to the Instagram application (TypeScript).
1. Users login or register to the app using email/password ( optional: Facebook login or Google login)
2. After login, the user is redirected to the home page
3. The home page consists of a place to share a new experience to the Instagram account and a place to view all Instagram posts (latest 10)
4. To share to Instagram, the user must submit a photo directly from the camera or upload it from local files(optional), and then fill the form with the required fields
5. On successful upload, a popup will appear: "Your post is online; Thank You !"
6. On the profile page, the user can edit the required information and logout from the application

Notes:
- Application must connect to firestore using a global service
- Images must be uploaded to firebase storage, and the image URL saved
to firestore
- The new post submission, must be done using an API call
- Submit an apk

