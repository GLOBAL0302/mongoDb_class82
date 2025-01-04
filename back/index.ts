import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import mongoDb from "./mongoDb";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);

const run = async()=>{
    await mongoose.connect("mongodb://localhost:27017/spotify");


    app.listen(port, ()=>{
        console.log(`Server running on port: http://localhost:${port}`);
    });

    process.on("exit", () => {
        mongoDb.disconnect();
    })
}

run().catch(err=>{
    console.error(err);
})