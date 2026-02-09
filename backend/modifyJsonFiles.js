const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const axios = require("axios");
const { promisify } = require("util");
const sleep = promisify(setTimeout);

// Directories
const inputDir = path.join(__dirname, "json-test");
const outputDir = path.join(__dirname, "json-data-new");

// Ensure the output directory exists
fsPromises.mkdir(outputDir, { recursive: true }).catch(console.error);

// Configuration
const API_URL = "http://localhost:5000/api/v1/templates";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiaWF0IjoxNzIwMjQ5ODg1fQ.TOioG5RonFWp2J_4LmKAYuubgavFs0V9G0JAiYIOjOo";
const BATCH_SIZE = 5; // Reduced batch size
const DELAY_BETWEEN_BATCHES = 10000; // Increased delay to 10 seconds
const MAX_RETRIES = 3; // Maximum number of retries for each operation
const RETRY_DELAY = 5000; // 5 seconds delay between retries

async function retryOperation(operation, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      console.log(
        `Attempt ${attempt} failed. Retrying in ${
          RETRY_DELAY / 1000
        } seconds...`
      );
      await sleep(RETRY_DELAY);
    }
  }
}

async function downloadImage(url, folderPath, filename) {
  return retryOperation(async () => {
    const filePath = path.join(folderPath, filename);
    const writer = fs.createWriteStream(filePath);

    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      timeout: 20000, // 30 seconds timeout
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(filePath));
      writer.on("error", reject);
    });
  });
}

async function processFile(file) {
  const inputFilePath = path.join(inputDir, file);
  console.log("filefilefilefilefile => ", file);

  try {
    const data = await fsPromises.readFile(inputFilePath, "utf8");
    const jsonData = JSON.parse(data);

    const thumbnailImage = jsonData.thumbnail_url || "";
    const template_name = jsonData.template_name?.toString() || "";
    const final_template_name = `${template_name}-${
      jsonData.format_category?.toString() || ""
    }-template`;
    const thumImagefileName = `${final_template_name.replace(
      /[^a-zA-Z0-9 ]/g,
      "-"
    )}-${Date.now()}.jpeg`.toLowerCase();

    await downloadImage(
      thumbnailImage,
      "uploads/templates/thumbnail/",
      thumImagefileName
    );

    const newFileName = `${template_name.replace(
      /[^a-zA-Z0-9 ]/g,
      "-"
    )}-${Date.now()}.json`.toLowerCase();

    const outputFilePath = path.join(outputDir, newFileName);

    const dataObjects = {
      name: template_name,
      description: jsonData.template_desc?.toString() || "",
      tags: jsonData.tags?.toString() || "",
      category: jsonData.format_category?.toString() || "",
      lang: jsonData.template_lang?.toString() || "",
      parent_type: jsonData.type?.parent_type?.toString() || "",
      child_type: jsonData.type?.child_type?.toString() || "",
      group_type: jsonData.type?.group?.toString() || "",
      platform_type: jsonData.type?.platform?.toString() || "",
      canvas_width: jsonData.canvas_doc_json?.doc_width?.toString() || "",
      canvas_height: jsonData.canvas_doc_json?.doc_height?.toString() || "",
      canvas_units: jsonData.canvas_doc_json?.doc_units?.toString() || "",
      thumbnail: thumImagefileName,
      json_file: newFileName,
      old_json_file: file,
    };

    await retryOperation(async () => {
      const response = await axios.post(API_URL, dataObjects, {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
        },
        timeout: 20000, // 30 seconds timeout
      });
      return response;
    });

    console.log(`Processed file: ${file}`);

    await fsPromises.writeFile(
      outputFilePath,
      JSON.stringify(jsonData, null, 2),
      "utf8"
    );
    // inputFilePath
    fs.unlink(inputFilePath, (err) => {
      if (err) {
        console.error(`Error removing file: ${err}`);
      } else {
        console.log(`File ${inputFilePath} was successfully removed`);
      }
    });
    console.log(`File written: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error processing file ${file}:`, error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
  }
}

async function processBatch(files) {
  return Promise.all(files.map((file) => processFile(file)));
}

async function processAllFiles() {
  try {
    const files = await fsPromises.readdir(inputDir);

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await processBatch(batch);
      console.log(`Processed batch ${i / BATCH_SIZE + 1}`);

      if (i + BATCH_SIZE < files.length) {
        console.log(
          `Waiting ${DELAY_BETWEEN_BATCHES / 1000} seconds before next batch...`
        );
        await sleep(DELAY_BETWEEN_BATCHES);
      }
    }

    console.log("All files processed successfully");
  } catch (error) {
    console.error("Error processing files:", error);
  }
}

processAllFiles();
