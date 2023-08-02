export const photosMock = (amount: number) => {
  const result = [];

  for (let i = 0; i < amount; i++) {
    result.push({
      albumId: i,
      id: i,
      title: `Awesome Photo ${i}`,
      url: `http://example.com/photo${i}.jpg`,
      thumbnailUrl: `http://example.com/thumbnail${i}.jpg`,
    });
  }
  return result;
};
