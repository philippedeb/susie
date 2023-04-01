export { getContributionCounts, getPonyFactor, getTopContributorPower };

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

/**
 * Get the pony factor of a repository.
 * The pony factor is the number of contributors needed to replace the current top contributor.
 *
 * @param commitAuthorDates The commit author dates of the repository.
 * @returns The pony factor of the repository.
 */
function getPonyFactor(commitAuthorDates: [string, string][]): number {
  const authorCommitCount = getContributionCounts(commitAuthorDates);
  const totalCommits = Object.values(authorCommitCount).reduce(
    (acc, val) => acc + val,
    0
  );
  const sortedContributors = Object.entries(authorCommitCount).sort(
    (a, b) => b[1] - a[1]
  );

  var ponyFactor = 0;
  var commitCount = 0;
  for (let i = 0; i < sortedContributors.length; i++) {
    const [_, amount] = sortedContributors[i];
    commitCount += amount;
    ponyFactor += 1;

    if (commitCount >= totalCommits / 2.0) {
      break;
    }
  }
  return ponyFactor;
}

/**
 * Number of contributors as the factor of the biggest contributor, in the form of a percentage.
 *
 * @param commitAuthorDates The commit author dates of the repository.
 * @returns The top contributor power of the repository.
 */
function getTopContributorPower(commitAuthorDates: [string, string][]): number {
  const authorCommitCount = getContributionCounts(commitAuthorDates);
  const sortedContributors = Object.entries(authorCommitCount).sort(
    (a, b) => b[1] - a[1]
  );

  if (sortedContributors.length === 0) {
    return 0;
  }

  const [_, topContributorAmount] = sortedContributors[0];

  const totalCommits = Object.values(authorCommitCount).reduce(
    (acc, val) => acc + val,
    0
  );

  return totalCommits / topContributorAmount;
}
