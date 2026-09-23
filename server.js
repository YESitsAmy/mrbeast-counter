```javascript
const express = require("express");
const crypto = require("crypto");

const app = express();
const CHANNEL = "UCX6OQ3DkcsbYNE6H8uQQuVA";

app.use(express.static("."));

app.get("/count", async (req, res) => {
    try {
        const time = Date.now().toString();
        const ajay = crypto.createHash("sha1").update(time).digest("hex");
        const midas = crypto.createHash("sha384").update(ajay + time).digest("hex");

        const response = await fetch(
            `https://api.livecounts.io/youtube-live-subscriber-counter/stats/${CHANNEL}`,
            {
                headers: {
                    "x-catto": time,
                    "x-ajay": ajay,
                    "x-midas": midas
                }
            }
        );

        res.json(await response.json());
    } catch {
        res.status(500).json({ error: true });
    }
});

app.listen(process.env.PORT || 3000);
```
