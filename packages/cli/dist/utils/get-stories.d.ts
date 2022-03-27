import { FwooshOptions, Story, StoryMeta } from "../types";
export declare function getStories({ stories, outDir, }: FwooshOptions): Promise<{
    stories: Story[];
    meta: StoryMeta;
}[]>;
