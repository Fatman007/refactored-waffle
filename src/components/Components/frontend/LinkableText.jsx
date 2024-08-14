import React from 'react';

const LinkableText = ({ text }) => {
  const renderLink = (url, index) => {
    const urlRegex = /(https?:\/\/[^\s)]+)/; // Updated regex to exclude ) at the end
    const match = url.match(urlRegex);

    if (match) {
      const linkUrl = match[0];
      const trimmedLinkUrl = linkUrl.endsWith('.') ? linkUrl.slice(0, -1) : linkUrl;

      return (
        <a className='font-serif underline' key={index} href={trimmedLinkUrl} target="_blank" rel="noopener noreferrer">
          {trimmedLinkUrl}
        </a>
      );
    }

    return url;
  };

  const parseText = () => {
    const urlRegex = /(https?:\/\/[^\s)]+)/g; // Updated regex to exclude ) at the end
    const parts = text.split(urlRegex);
    return parts.map((part, index) =>
      urlRegex.test(part) ? renderLink(part, index) : part
    );
  };

  return <div>{parseText()}</div>;
};

export default LinkableText;
