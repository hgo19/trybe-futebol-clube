const homeLeaderboardQuery = `SELECT 
t.team_name AS 'name', 
SUM(CASE
  WHEN m.home_team_goals > m.away_team_goals THEN 3
      WHEN m.home_team_goals = m.away_team_goals THEN 1
      ELSE 0
END) AS totalPoints,
COUNT(m.id) AS totalGames,
  SUM(CASE
  WHEN m.home_team_goals > m.away_team_goals THEN 1
      ELSE 0
END) AS totalVictories,
  SUM(m.home_team_goals) AS goalsFavor,
  SUM(m.away_team_goals) AS goalsOwn,
  SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance
FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON m.home_team_id = t.id
WHERE m.in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default homeLeaderboardQuery;
