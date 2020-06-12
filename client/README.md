# Front-end structure

### Components
- Main NavBar

	- Home

	- My PC

	- Browse

		- Search by Number/Name/Type/Move/Ability

		- Name first, rest are a bonus, likely

- Community (bonus)

	- Groups (Leagues?)

	- Friends

- Comments - Div, takes state, maps an array of comments found by pokedex number to each pokemon’s page

- PokeDivs - Fetch pokemon by number

	- Small divs represented by pokemon sprite + name/number to display on PC/searches

	- Each contains a navLink to the Pokemon page that takes in state through redux to render the specific pokemon

- BoxDiv

	- Basically PokeDiv but without the name. Used for PC boxes if I style them correctly

- Pokemon Pages

	- One Page, takes in state to make fetches to pokeAPI

	- Always shows pokemon Name, Number and Types, along with Abilities

	- Passes pokemon id state to a div to pull comments on that pokemon

	- buttons to display moves, encounter data etcs if I have time

- Bookshelf / PC page

	- Shows all your collected pokemon, along with those you want to catch and plan to catch soon

	- Styled as an ingame PC box? Maybe made of PokeDivs without the names.

- Profile page

	- Shows user info (userId prop passed in or Redux)

	- Name/Nickname

	- Favourite generation/types/abilities

	- Shows the first 5-10 pokemon in your caught/will catch/want to catch list

	- Shows comments made by you.

- Friend page

	- Similar to profile page, with friend’s user ID passed in.

	- Does not show their comments.


# Folders

- Components
   - PokeDiv
   - BoxDiv
   - Comment
   - PokeInfo
     - Type iframe
     - Abilities Block
     - StatBlock (figure out CSS for it)
     - MovesDiv
     - Comments
   - MovesDiv
   - StatDiv

- Login Page
  - Login Form

- Signup Page
  - Signup Form


- Profile Page
  - Personal info block
  - Possible picture
  - Friends
  - Groups
  - Collection
    - Sprite Navlinks


- NavBar
  - Links to
    - Home
    - Search
    - Profile
    - Friends


- Store
  - UserId
  - PokeId



## Routes
/pokemon/:id

## Navlink
/pokemon/pokemon.id


## Reviews route
requires auth, frontend placeholder saying to login to see reviews


### Backend route ref

- /reviews
  - /:id/delete (DELETE)
  - /:id/edit (PUT)
  - /:id (GET)
  - /:id/:pokeId (POST)

- /user
  - /:id (GET)
  - /:id/reviews (GET)
  - /:id/collection (GET)

- /login (POST)
- /sign-up (POST)


### Credits
Type symbols are from https://www.deviantart.com/falke2009/art/Pokemon-Type-Symbols-Downloadable-403610684
