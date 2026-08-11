import { profile } from "@/content/profile";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = `${profile.name}, backend-focused software engineer`;
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage({
    eyebrow: profile.role,
    title: profile.name,
    subtitle: profile.headline,
    tags: profile.coreSkills,
  });
}
