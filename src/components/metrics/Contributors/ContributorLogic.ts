export { getContributionCounts, getBusFactor };

function getContributionCounts(commitAuthorDates: [string, string][]): {
  [key: string]: number;
} {
  const authorCommitCount: { [key: string]: number } = {};

  for (let i of commitAuthorDates) {
    if (i[0] in authorCommitCount) {
      authorCommitCount[i[0]] += 1;
    } else {
      authorCommitCount[i[0]] = 1;
    }
  }
  return authorCommitCount;
}

function latestCommitDate(commitAuthorDates: [string, string][]): string {
  return commitAuthorDates[0][1];
}

function getBusFactor(commitAuthorDates: [string, string][]): number {
  const authorCommitCount = getContributionCounts(commitAuthorDates);
  const totalCommits = Object.values(authorCommitCount).reduce(
    (acc, val) => acc + val,
    0
  );
  const sortedContributors = Object.entries(authorCommitCount).sort(
    (a, b) => b[1] - a[1]
  );

  console.log(sortedContributors);

  var busFactor = 0;
  var commitCount = 0;
  for (let i = 0; i < sortedContributors.length; i++) {
    const [_, amount] = sortedContributors[i];
    commitCount += amount;
    busFactor += 1;

    if (commitCount >= totalCommits / 2.0) {
      break;
    }
  }
  return busFactor;
}
