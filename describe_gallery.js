import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("No GEMINI_API_KEY found");
  process.exit(1);
}

const GALLERY_IMAGES = [
  { url: 'https://i.postimg.cc/xCC3XM6R/d1eb9c15-b336-4bf3-9cb0-d7400712e8c1.jpg', id: 1 },
  { url: 'https://i.postimg.cc/WpysKVr6/17.jpg', id: 2 },
  { url: 'https://i.postimg.cc/N0tNjyh0/525a7ebb-7c86-4e7b-af5e-b420962adb68.jpg', id: 3 },
  { url: 'https://i.postimg.cc/8zS3jXMk/fd1e841d-049f-48a3-a8ca-c76337f4b653.jpg', id: 4 },
  { url: 'https://i.postimg.cc/TYjHbqRg/b084b620-c6fb-4fc2-a02f-e0d055e497af.jpg', id: 5 },
  { url: 'https://i.postimg.cc/wvyFWDDY/84f2391c-518c-48b6-9dca-008dddc665e0.jpg', id: 6 }
];

// Ensure we have a temp dir
execSync('mkdir -p ./gallery_temp');

async function analyze() {
  for (let i = 0; i < GALLERY_IMAGES.length; i++) {
    const img = GALLERY_IMAGES[i];
    const localPath = `./gallery_temp/img_${img.id}.jpg`;
    
    // Download using curl
    try {
      if (!existsSync(localPath)) {
        console.log(`Downloading Image ${img.id}...`);
        execSync(`curl -L -s -o ${localPath} "${img.url}"`);
      }
    } catch (e) {
      console.error(`Download failed for image ${img.id}:`, e.message);
      continue;
    }

    if (!existsSync(localPath)) {
      console.log(`Image ${img.id} file does not exist.`);
      continue;
    }

    const buffer = readFileSync(localPath);
    const base64Data = buffer.toString('base64');

    const body = {
      contents: [{
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Data
            }
          },
          {
            text: `Describe this image briefly in English. Focus on:
            - Are they writing/drawing on papers?
            - Are they sitting in a circle? How many?
            - Are there three women holding/showing papers to the camera/each other?
            Please give me a 1-sentence description.`
          }
        ]
      }]
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const resJson = await response.json();
      if (resJson.error) {
        console.log(`Image ${img.id} API Error: ${resJson.error.message}`);
      } else {
        const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "No description text";
        console.log(`Image ${img.id} (${img.url}): ${text.trim()}`);
      }
    } catch (e) {
      console.error(`Analysis failed for image ${img.id}:`, e.message);
    }

    // Small delay
    await new Promise(r => setTimeout(r, 1000));
  }
}

analyze();
