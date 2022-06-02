# First, run the development server:

## FE

```bash
1.) cd FE

2.) docker-compose up --build -d

3.) yarn run prepare

4.) yarn add lint-staged
```

## BE

Copy `.env.example` and rename to `.env`

```bash
1.) cd BE

2.) docker-compose up --build -d
```

### How to connect DB using dbeaver

1. Add new connection using mysql 8+
2. Set host: `localhost`
3. Set Port: `3300`
4. Go to driver Properties tab
5. Add properties: "useSSL" and "allowPublicKeyRetrieval"
6. Set their values to "true" by double clicking on the "value" column
