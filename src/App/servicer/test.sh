curl --location --request POST 'https://juris.predictus.inf.br:8443/predictus-api/lawsuits/search/stream' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwb250dGUuaG9tb2xvZ2FjYW8iLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNjcxMDM5MTYyLCJleHAiOjE2NzExMjU1NjJ9.-ov1QcBVGcZsumylBgEgc6P9-FLQlJcUqZhWb0tNwsmzC81QaU8ee7-bpjOx0htHiVOAI57Sd2r8I38_ceakcQ' \
--data-raw '{"cpfCnpj": "13749521000198"}'
