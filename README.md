# Indie Games WebApp
<table>
<tr>
<td>
  The idea of the web application was to fetch an API from the <a href="https://rawg.io/apidocs">RAWG API</a> website and display a 
  small list of indie games, develop an authentication system using <a href="https://www.npmjs.com/package/express-session">express-session</a>, 
  and allow users to interact with their favorite games, leave a review and add to favorites.
</td>
</tr>
</table>

## Folder Structure

```
game_web/
├── client/                  # Project client side
│   ├── src/
│     ├── components         # React components
│     ├── pages              # Pages on the web site
│     ├── styles             # CSS styles
├── server/                  # Project server side 
│     ├── controllers        # Error handling and mechanics
│     ├── database           # Configuring the connection to the PostgreSQL database
│     ├── routes             # Endpoints
│     ├── server.js          # Main server file
├── package.json             # Project configuration and dependencies
├── .gitignore               # Files and folders ignored by Git
└── README.md                # Project documentation
```


### Home Page
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/homepage_main.png)

### Sign up form
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/signup_page.png)

### Log in Form 
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/login_page.png)

### Game description 
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/game_description_page.png)

### Comments belove game  
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/comments_scrolled.png)

### Favorites  
![](https://github.com/vinylsoap/game_web/blob/4a069519c412da217d31ba76e56139d2fdea6564/images/demo/favorites_page.png)


## Mobile support
In development.


### Development
Want to contribute? Great!

To fix a bug or enhance an existing module, follow these steps:

- Fork the repo
- Create a new branch (`git checkout -b improve-feature`)
- Make the appropriate changes in the files
- Add changes to reflect the changes made
- Commit your changes (`git commit -am 'improve feature'`)
- Push to the branch (`git push origin improve-feature`)
- Create a Pull Request 

## Built with 

- [React Vite](https://vite.dev/guide/) - build tool that aims to provide a faster and leaner development experience for modern web projects.
- [RAWG API](https://rawg.io/apidocs) - RAWG Video Games Database API.
- [daisyUI](https://daisyui.com/) - daisyUI is the Tailwind CSS plugin that provides useful component class names
to help you write less code and build faster.


## To-do
- Adapt to devices of all sizes.
- Add more games to the list.
- Add the ability to search by title.

