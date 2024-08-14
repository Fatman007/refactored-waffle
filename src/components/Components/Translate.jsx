import React, { useEffect, useState } from "react";

export default function Translate({ lang, keygen }) {
  const [translationData, setTranslationData] = useState(null);

  useEffect(() => {
    // Construct the path to the JSON file based on the lang prop
    const jsonPath = `/resources/lang/${lang}.json`;

    // Fetch the JSON file
    fetch(jsonPath)
      .then((response) => response.json())
      .then((data) => {
        setTranslationData(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("Error fetching translation data:", error);
      });
  }, [lang]);

  // Get the translated value based on keygen
  const translatedValue = translationData && translationData[keygen];

  return (
    <>
      {translatedValue ? (
        <>{translatedValue}</>
      ) : (
        <>{keygen}</>
      )}
    </>
  );


}
