# Stage 0 — Backend API Integration & Data Processing Assessment

**Public API base URL:** `https://task-0-opal.vercel.app/`

---

## Description

Implements a single GET endpoint **`/api/classify`** that accepts a `name` query parameter, calls the Genderize API, processes the response per the assessment rules, and returns a normalized JSON payload.

---

### Endpoint

**GET** `/api/classify?name=<string>`

## Example

```bash
curl "https://task-0-opal.vercel.app/api/classify?name=alex"
```

---

### Success Response (200)

```json
{
  "status": "success",
  "data": {
    "name": "alex",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}
```

---

### Error Response format

All errors use:

```json
{
  "status": "error",
  "message": "<error message>"
}
```

## Validation errors

- Missing or empty `name`  
  **Status:** `400 Bad Request`  
  **Message:** `name query parameter is required`

- Non-string `name`  
  **Status:** `422 Unprocessable Entity`  
  **Message:** `name must be a string`

## Genderize edge case

- If Genderize returns `gender: null` **or** `count: 0`  
  **Status:** `200 OK` (body indicates error)  
  **Body:**

  ```json
  {
    "status": "error",
    "message": "No prediction available for the provided name"
  }
  ```

## External/API errors

- Use `500` or `502` with the same error body structure and a descriptive message.

---

### Processing rules

- Extract `gender`, `probability`, and `count` from Genderize response.
- Rename `count` → **`sample_size`**.
- Compute **`is_confident`**: `true` only when `probability >= 0.7` **AND** `sample_size >= 100`; otherwise `false`.
- Generate **`processed_at`** on every request in UTC ISO 8601 (e.g., `2026-04-01T12:00:00Z`).
- If `gender === null` **or** `count === 0`, return the Genderize edge case error above.

---

### Submission

- **GitHub repo (public)** containing this README and source code.
- **Public API base URL:** `https://task-0-opal.vercel.app/`
