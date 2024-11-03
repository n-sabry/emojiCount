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
    <label for="story">emojiCount</label>
    <textarea 
    onChange={handleSubmit}
    placeholder="do tell" id="story" name="story" rows="5" cols="33" ref={inputRef}>
    </textarea>
    {isShow &&
      <div>
        <h2>{JSON.stringify(emojiCounts)}</h2>
        <p>top 3 most common emojis in this sentence are {Object.values(emojiCounts)[0]}, {Object.values(emojiCounts)[1]} and {Object.values(emojiCounts)[]}</p>
      </div>
    }
  </div>
  );
}

export default App;
