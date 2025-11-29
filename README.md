# This is a Bloggish app. Where i test lots of backend and frontend funcitonality for learning purposes.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/nishat/bloggish.git
    ```

2. Install dependencies

    ```bash
    bun install
    ```

3. Set up environment variables

    ```bash
    cp .env.example .env
    ```

4. Run the development server

    ```bash
    make dev
    ```

This command will start the development server locally and also start the database and prisma studio in docker containers.

5. Access the application

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6. Prisma Studio

    Open [http://localhost:5555](http://localhost:5555) with your browser to see the database.
