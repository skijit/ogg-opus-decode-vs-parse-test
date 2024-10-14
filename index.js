import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { OggOpusDecoder } from "ogg-opus-decoder";
import CodecParser from "codec-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function readFile(fileName) {
  const file = join(__dirname, "assets", fileName);
  const buffer = readFileSync(file);
  const uint8Array = new Uint8Array(buffer);
  return uint8Array;
}

async function decode(file) {
  const decoder = new OggOpusDecoder();
  await decoder.ready;

  const { channelData, samplesDecoded, sampleRate } = await decoder.decodeFile(
    file
  );

  console.log(`Total samples from decoded filet: ${samplesDecoded}`);
}

function parse(file) {
  const parser = new CodecParser("audio/ogg");
  const oggPages = parser.parseAll(file);
  console.log(
    `Total samples from parser: ${oggPages[oggPages.length - 1].totalSamples}`
  );
}

async function main() {
  const file = readFile("Turtles-YouBaby.opus");
  await decode(file);
  parse(file);
}

await main();
