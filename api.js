export async function fetchQuestions(amount = 5, difficulty = 'easy') {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  }
  