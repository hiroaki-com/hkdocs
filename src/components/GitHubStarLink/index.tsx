import React, { useEffect, useState } from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface GitHubStarLinkProps {
  repo: string;
  showCount?: boolean;
}

const CACHE_DURATION = 1000 * 60 * 30;

export default function GitHubStarLink({
  repo,
  showCount = true,
}: GitHubStarLinkProps) {
  const [starCount, setStarCount] = useState<number | null>(null);
  
  // GitHub Mark (Octocat) Icon
  const GitHubLogo = () => (
    <svg className={styles.ghLogo} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );

  // Star Icon (Small)
  const StarIcon = () => (
    <svg className={styles.icon} viewBox="0 0 16 16" version="1.1" aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.719-4.192-3.046-2.97a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
    </svg>
  );

  useEffect(() => {
    if (!showCount) return;

    const fetchStars = async () => {
      const cacheKey = `gh-stars-${repo}`;
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const { count, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setStarCount(count);
            return;
          }
        }
      } catch (e) { /* ignore */ }

      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        const count = data.stargazers_count;
        
        setStarCount(count);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ count, timestamp: Date.now() }));
        } catch (e) { /* ignore */ }
      } catch (error) {
        // API errors are silently ignored
      }
    };

    fetchStars();
  }, [repo, showCount]);

  return (
    <div className={styles.container}>
      <GitHubLogo />
      <span className={styles.text}>
        <Translate
          id="component.GitHubStarLink.text"
          description="The text asking for a GitHub star support">
          このサイトがお役に立ったら🌟で応援お願いします🙏
        </Translate>
      </span>
      <a
        href={`https://github.com/${repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.linkWrapper}
        aria-label={`Star ${repo} on GitHub`}
      >
        <div className={styles.starButton}>
          <StarIcon />
          <span>Star on GitHub</span>
        </div>
        {showCount && starCount !== null && (
          <div className={styles.countBadge}>
            {starCount.toLocaleString()}
          </div>
        )}
      </a>
    </div>
  );
}
