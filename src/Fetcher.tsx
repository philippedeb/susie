import React from "react";
import { Languages } from "./LanguageAnalyser";
import { analyseLanguages } from "./LanguageAnalyser";

export async function getData(searchValue: string): Promise<void> {
    try {
        const repo = extractGitHubRepoPath(searchValue)
        const response = await fetch('https://api.github.com/repos/' + repo + '/languages');
        const data = await response.json();
        console.log(data);
        analyseLanguages(data) // Probably needs to be somewehere else
        return data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * https://www.seancdavis.com/posts/extract-github-repo-name-from-url-using-javascript/
 */
function extractGitHubRepoPath(url: string) {
    if (!url) return null;
    const match = url.match(/^https?:\/\/(www\.)?github.com\/(?<owner>[\w.-]+)\/(?<name>[\w.-]+)/);
    if (!match || !(match.groups?.owner && match.groups?.name)) return null;
    return `${match.groups.owner}/${match.groups.name}`;
}
