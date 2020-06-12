# GoodPokes (GoodReads, reflavoured)

### MVPs

- Pokemon

- Bookshelves (PC - Pokemon Collection/Personal Computer)

- Reviews/Comments

- Caught Status (will catch, have caught, etc.)

- *Bonus: Search across multiple models*

- *Bonus: Tags (Search by type/ability?)*



### Data Models

- User
	- Contains arrays of Pokemon Ids to fetch for ‘will catch’, ‘want to catch’ and ‘have caught’
	- Contains friends array
	- Groups

- Reviews
	- Belongs to Users, assigned to Pokedex numbers

- PC
	- Belongs to Users, hooks pokemon by number into the user page by PK
	- A simple array of numbers

- Groups
	- Contain a name, and an array of users in the group, as well as group posts

### Credits
Type symbols are from https://www.deviantart.com/falke2009/art/Pokemon-Type-Symbols-Downloadable-403610684

