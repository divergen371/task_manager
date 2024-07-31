-- データベースが存在しない場合のみ作成
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'task_manager') THEN
      PERFORM dblink_exec('CREATE DATABASE task_manager');
   END IF;
END
$$;
