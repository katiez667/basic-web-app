export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "katie z";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "mengyua3";
  }
  const addMatch = query.match(/(\d+)\s*plus\s*(\d+)/i);
  if (addMatch) {
    return String(Number(addMatch[1]) + Number(addMatch[2]));
  }
  const largestMatch = query.match(/largest[^:]*:\s*([\d,\s]+)/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map(n => Number(n.trim()));
    return String(Math.max(...numbers));
  }


  return "";
}
