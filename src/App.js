import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const inputRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [emojiCounts, setEmojiCounts] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const text = inputRef.current.value;

    const emojiCounts = {};
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });

    for (const segment of segmenter.segment(text)) {
      const char = segment.segment;
      if (/\p{Emoji_Presentation}/u.test(char)) {
        emojiCounts[char] = (emojiCounts[char] || 0) + 1;
      }
    }

    setIsShow(true);
    setEmojiCounts(Object.entries(emojiCounts).sort((a, b) => b[1] - a[1]));
  };

  return (
  <div className="center">
    <h1>emojiCount</h1>
    <textarea 
    onChange={handleSubmit}
    placeholder="do tell" id="story" name="story" rows="5" cols="33" ref={inputRef}>
    </textarea>
    {isShow && emojiCounts && emojiCounts.length > 0 ? 
        <div>
          <h2>total counts: {JSON.stringify(emojiCounts) || ''}</h2>
          <h2>top 4 emojis in input are {Object.values(emojiCounts)[0][0]}, {Object.values(emojiCounts)[1][0]}, {Object.values(emojiCounts)[2][0]} and {Object.values(emojiCounts)[3][0]}</h2>
        </div>
        : <h2>no emojis detected</h2>
    }
  </div>
  );
}

export default App;
