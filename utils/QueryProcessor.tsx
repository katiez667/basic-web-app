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
  const powerMatch = query.match(/(\d+)\s* to the power of\s*(\d+)/i);
  if (powerMatch) {
    return String(Number(powerMatch[1]) ** Number(powerMatch[2]));
  }
  const minusMatch = query.match(/(\d+)\s*minus\s*(\d+)/i);
  if (minusMatch) {
    return String(Number(minusMatch[1]) - Number(minusMatch[2]));
  }
  const largestMatch = query.match(/largest[^:]*:\s*([\d,\s]+)/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map(n => Number(n.trim()));
    return String(Math.max(...numbers));
  }
  const multMatch = query.match(/(\d+)\s*multiplied by\s*(\d+)/i);
  if (multMatch) {
    return String(Number(multMatch[1]) * Number(multMatch[2]));
  }
  const squareCubeMatch = query.match(/square and a cube[^:]*:\s*([\d,\s]+)/i);
  if (squareCubeMatch) {
    const numbers = squareCubeMatch[1].split(",").map(n => Number(n.trim()));
    const result = numbers.find(n => {
      const sqrt = Math.round(Math.sqrt(n));
      const cbrt = Math.round(Math.cbrt(n));
      return sqrt * sqrt === n && cbrt * cbrt * cbrt === n;
    });
    return String(result ?? "");
  }
  const primesMatch = query.match(/which of the following numbers are primes[^:]*:\s*([\d,\s]+)/i);
  if (primesMatch) {
    const numbers = primesMatch[1].split(",").map(n => Number(n.trim()));
    const isPrime = (n: number) => {
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    };
    return numbers.filter(isPrime).join(", ");
  }


  return "";
}
