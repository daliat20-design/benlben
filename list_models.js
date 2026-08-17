const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("No GEMINI_API_KEY found");
  process.exit(1);
}

async function run() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await res.json();
    console.log("Supported Models:");
    if (data.models) {
      data.models.forEach(m => {
        console.log(`- ${m.name} (${m.displayName})`);
      });
    } else {
      console.log(JSON.stringify(data));
    }
  } catch (err) {
    console.error(err);
  }
}

run();
