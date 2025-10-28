"use client";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";

export default function SharePost({ postUrl, title, description, image }) {
  const shareTitle = title || "Check out this post!";
  const shareDesc = description || "";
  const shareImage = image || "";

  return (
    <div className="flex flex-wrap gap-3 items-center mt-6">
      <p className="text-sm text-gray-400 w-full">Share this post:</p>

      <FacebookShareButton
        url={postUrl}
        quote={`${shareTitle}\n\n${shareDesc}`}
        hashtag="#PostShare"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={postUrl} title={`${shareTitle} — ${shareDesc}`}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={postUrl}
        title={shareTitle}
        summary={shareDesc}
        source={image ? image : undefined}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton
        url={postUrl}
        title={`${shareTitle}\n${shareDesc}`}
        separator="\n"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
