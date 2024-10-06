
create
or replace function givePayout (winnerOptionId text) returns void as $$
BEGIN
  UPDATE Member
  SET points = points + OddsOption.payout
  FROM Selection
  JOIN OddsOption ON Selection.optionId = OddsOption.id
  WHERE Selection.userId = Member.userId
    AND Selection.optionId = winnerOptionId;
END;
$$ language plpgsql;