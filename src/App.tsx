import { useEffect, useMemo, useRef, useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const audioShakeRef = useRef(null);
  // const [dlID, setdlID] = useState("");

  const AudioShakeWidgetLib = window.AudioShakeWidgetLib;
  const userSessionId = "1234567890";
  const licenseId = "cllyjvi0p022hf0n75nlj46ly";
  const format = "wav";

  const stemOptions = [
    "vocals",
    "instrumental",
    "bass",
    "drums",
    "guitar",
    "other",
    "other-x-guitar",
    "piano",
  ];

  const dlID = useMemo(() => {
    const id = url.match(new RegExp("file/d/(.*)/view"))?.[1];
    const finalUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    return { id, finalUrl };
  }, [url]);

  useEffect(() => {
    // if (!dlID.id) return;

    audioShakeRef.current = new AudioShakeWidgetLib.WidgetPresenter({
      licenseId,
      stemOptions,
      format,
      userSessionId,
    });

    console.log(AudioShakeWidgetLib);

    return () => {
      console.log("disconnect");
      if (audioShakeRef.current) {
        audioShakeRef.current = null;
      }
    };
  }, [dlID.id]);

  return (
    <>
      <div>
        <h1>AudioShake Stems</h1>

        {dlID.id}

        <input
          className="url"
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {dlID.id ? (
        <button
          id={dlID.id}
          audioshake-audio-id={dlID.id + "s2"}
          audioshake-link={dlID.finalUrl}
          audioshake-filename={dlID.id}
        >
          Get Stems
        </button>
      ) : null}
    </>
  );
}

export default App;
