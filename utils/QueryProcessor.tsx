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
  // const addMatch = query.match(/[\d]+(?:\s*plus\s*[\d]+)+/i);
  // if (addMatch) {
  //   const numbers = addMatch[0].split(/\s*plus\s*/i).map(Number);
  //   return String(numbers.reduce((a, b) => a + b, 0));
  // }
  const powerMatch = query.match(/(\d+)\s* to the power of\s*(\d+)/i);
  if (powerMatch) {
    return String(Number(powerMatch[1]) ** Number(powerMatch[2]));
  }
  // const minusMatch = query.match(/(\d+)\s*minus\s*(\d+)/i);
  // if (minusMatch) {
  //   return String(Number(minusMatch[1]) - Number(minusMatch[2]));
  // }
  const largestMatch = query.match(/largest[^:]*:\s*([\d,\s]+)/i);
  if (largestMatch) {
    const numbers = largestMatch[1].split(",").map(n => Number(n.trim()));
    return String(Math.max(...numbers));
  }
  // const multMatch = query.match(/(\d+)\s*multiplied by\s*(\d+)/i);
  // if (multMatch) {
  //   return String(Number(multMatch[1]) * Number(multMatch[2]));
  // }
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
  const mathMatch = query.match(/[\d]+(?:\s*(?:plus|minus|multiplied by|divided by|to the power of)\s*[\d]+)+/i);
  if (mathMatch) {
    const tokens = mathMatch[0].split(/\s*(plus|minus|multiplied by|divided by|to the power of)\s*/i);
    const numbers = tokens.filter((_, i) => i % 2 === 0).map(Number);
    const ops = tokens.filter((_, i) => i % 2 === 1).map(s => s.toLowerCase());

    // First pass: power
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "to the power of") {
        numbers[i] = Math.pow(numbers[i], numbers[i + 1]);
        numbers.splice(i + 1, 1);
        ops.splice(i, 1);
        i--;
      }
    }

    // Second pass: multiply and divide
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "multiplied by" || ops[i] === "divided by") {
        numbers[i] = ops[i] === "multiplied by" ? numbers[i] * numbers[i + 1] : numbers[i] / numbers[i + 1];
        numbers.splice(i + 1, 1);
        ops.splice(i, 1);
        i--;
      }
    }

    // Third pass: plus and minus
    for (let i = 0; i < ops.length; i++) {
      if (ops[i] === "plus" || ops[i] === "minus") {
        numbers[i] = ops[i] === "plus" ? numbers[i] + numbers[i + 1] : numbers[i] - numbers[i + 1];
        numbers.splice(i + 1, 1);
        ops.splice(i, 1);
        i--;
      }
    }

    return String(numbers[0]);
  }
  const scrabbleMatch = query.match(/scrabble score of (\w+)/i);
  if (scrabbleMatch) {
    const scores: Record<string, number> = {
      a:1, e:1, i:1, o:1, u:1, l:1, n:1, s:1, t:1, r:1,
      d:2, g:2,
      b:3, c:3, m:3, p:3,
      f:4, h:4, v:4, w:4, y:4,
      k:5,
      j:8, x:8,
      q:10, z:10
    };
    const word = scrabbleMatch[1].toLowerCase();
    const score = word.split("").reduce((sum, c) => sum + (scores[c] ?? 0), 0);
    return String(score);
  }


  return "";
}
