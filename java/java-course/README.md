# Java Course Coding Convention

## 1. PROJECT STRUCTURE

## 2. CODING CONVENTIONS

### 1. Common

- Database connection must be **dynamic connection**.
- All of classes must `implements Serializable`.
- `catch` clauses only exist in `Controller`.
- Processing logic must stay inside **meaningful, reusable & testable** function.
- Call `setProperty` inside **constructor**.
- Meaningful condition while using `if-else`. If it's complicated, creating new function or local variable in order to name it easier to catch up for long time.
- Never use SELECT \*
  ```
  SELECT * FROM Table
  ```

> Not Good

```java
public void checkGameStatus() {
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  ) {
    quitGame();
  }
}
```

> Best Practice:

```java
public boolean isGameLost() {
  return (
    remaining === 0 ||
    (remaining === 1 && remainingPlayers === 1) ||
    remainingPlayers === 0
  );
}

// Our function is now much easier to understand:
public void checkGameStatus() {
  if (isGameLost()) {
    quitGame();
  }
}
```

- Early return rather than nested `if-else`.

> Not Good

```java
public void writeTweet() throws Exception {
  const tweet = writeSomething();

  if (isLoggedIn()) {
    if (tweet) {
      if (isTweetDoubleChecked()) {
        tweetIt();
      } else {
        throw new Error("Dont publish without double checking your tweet");
      }
    } else {
      throw new Error("Your tweet is empty, can't publish it");
    }
  } else {
    throw new Error("You need to log in before tweeting");
  }
}
```

> Best Practice:

```java
public void writeTweet() throws Exception {
  const tweet = writeSomething();

  if (!isLoggedIn()) {
    throw new Error("You need to log in before tweeting");
  }
  if (!tweet) {
    throw new Error("Your tweet is empty, can't publish it");
  }
  if (!isTweetDoubleChecked()) {
    throw new Error("Dont publish without double checking your tweet");
  }

  tweetIt();
}
```

- Always [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (don’t repeat yourself) principle rather than copy-paste.
- Always [SRP](https://medium.com/@severinperez/writing-flexible-code-with-the-single-responsibility-principle-b71c4f3f883f) (Single Responsibility Principle). Functions should only do 1 thing.

### 2. Naming Conventions

#### 1. Package and file naming conventions:

- Wrapper package names by your `name` (exp: hoant, phuongnt).
- Package names must be **lowercase**.
- All kinds of name must be **PascalCase** and reflect with appropriate **Database Table Name**.
- Controller names must be postfix with **Controller**.
- DAO names must be postfix with **DAO**.
- DTO names must be postfix with **DTO**.
- Filter names must be postfix with **Filter**.
- JSP & HTML names must be **snake_case**.
  - `create_food.jsp`
  - `not_found.html`
  - `login.jsp`

#### 2. Code naming conventions:

- Common:
  - Class, interface, enum must be a **noun** and follow **PascalCase**.
  - Constants and enum attributes follows **UPPER_SNAKECASE**.
  - Function, variables follow **camelCase**.
  - Boolean variable and boolean-returned function must start with **is\_\_\_\_**. (boolean isSuccessful, not <s>checkSuccessful</s>, not <s>flag</s>).
  - All field must have access modifier. (public, private, protected).
  - Database table **fields** follows **lower_snake_case**.
  - Form item names must be **camelCase**.
- Variable:
  - Must be a **noun**.
  - Array variables are plural, start **arrayOf** (optional)
    - heroes not <s>hero</s>
    - arrayOfHeroes not <s>hero</s>
- Function:
  - Must start with a **verb**.
  - Starts with **get** must be returned exact type.
    - `getMedia()` will return `MediaType`.
  - Starts with **set** must be returned **void**.
  - Highly write testable function.

### 3. Code Arrangement

1. Public static attributes (Alphabetize)
1. Private static attributes (Alphabetize)
1. Public attributes (Alphabetize)
1. Private attributes (Alphabetize)
1. Constructors
1. Public static functions (Alphabetize)
1. Private static functions (Alphabetize)
1. Public functions (Alphabetize)
1. Private functions (Alphabetize)
1. Implemented Functions from (`implements`, `extends`)

### 4. Coding Guideline

#### 1. Function Principle:

Follows these 5 steps:

1. Input
2. Validate
3. Transform
4. Execute
5. Output
