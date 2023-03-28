export { getContributorPercentages }

function getContributorPercentages(commitAuthorDates: [string, string][]): { [key: string]: number } {
  const authorCommitCount: { [key: string]: number } = {}

  for (let i of commitAuthorDates) {
    if (i[0] in authorCommitCount) {
      // console.log(i)
      authorCommitCount[i[0]] += 1;
    } else {
      authorCommitCount[i[0]] = 1
    }
    // console.log(i, authorCommitCount[i[0]]);
  }
  console.log("ehehhehe")
  console.log(authorCommitCount);
  return authorCommitCount;
}

