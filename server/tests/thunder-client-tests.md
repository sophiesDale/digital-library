# Thunder Client API Tests

API testing was performed using the Thunder Client VS Code extension.

The free version of Thunder Client was used, which limits the number of saved
requests. Because of this, the test setup is documented manually.

## GET /books
- Method: GET
- URL: http://localhost:3001/books
- Purpose: Verify that the books endpoint is reachable

Expected response:
```json
{
  "message": "Get all books (not implemented)"
}

## PATCH /books/:id/status
- Method: PATCH
- URL: http://localhost:3001/books/1/status
- Purpose: Verify the custom reading status endpoint

Request body:
```json
{
  "status": "reading"
}
