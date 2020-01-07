# Api

This is the backend of MemoryCLIP. It provides the necessary data to the app and frontend.

## Routes

The api is currently available at [memoryclip.hannsadrian.de](https://memoryclip.hannsadrian.de/)

### `/query`
Search for a poi.

**Valid params:**

| title | description | required |
|-------|-------------|----------|
| name  | find a poi by name | true *(if there are no lat and lng params)* |
| lat   | latitude near poi | true *(if there is no name param)* |
| lng   | longitude near poi | true *(if there is no name param)* |
| only  | filter. options are: `building`, `place`, `depot`, `stolperstein` | false |

> to combine multiple filters just put a comma between them e.g. `building,depot`

**Example response:**

`GET https://memoryclip.hannsadrian.de/query?name=Kirche&only=building`

```
[
    {
        "id": 0,
        "name": "Frauenkirche",
        "type": "building",
        "img": "PLACEHOLDER",
        "coordinates": {
            "lat": 51.051858,
            "lng": 13.741312
        },
        "article": ...
    },
    {
        "id": 1,
        "name": "Kreuzkirche",
        "type": "building",
        "img": "PLACEHOLDER",
        "coordinates": {
            "lat": 51.048952,
            "lng": 13.738766
        },
        "article": ...
    }
]
```

### `/entry`
Query a specific entry.

**Valid params:**

| title | description | required |
|-------|-------------|----------|
| id  | id of entry | true |

**Example response:**

`GET https://memoryclip.hannsadrian.de/entry?id=4`

```
[
    {
        "id": 4,
        "name": "Seestraße 7",
        "type": "stolperstein",
        "img": "PLACEHOLDER",
        "coordinates": {
            "lat": 51.04812,
            "lng": 13.736936
        },
        "article": ...
    }
]
```
