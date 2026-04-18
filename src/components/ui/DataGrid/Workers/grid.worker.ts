self.onmessage = (e: MessageEvent) => {
  const { dataset } = e.data;

  // In a real worker, you can't pass functions easily,
  // so we perform the transformation logic directly here.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformed = dataset.map((item: any, index: number) => ({
    ...item,
    id: item.id || index, // Ensure every row has a unique ID
    salary: item.salary ? `$${item.salary.toLocaleString()}` : '$0',
  }));

  self.postMessage(transformed);
};
