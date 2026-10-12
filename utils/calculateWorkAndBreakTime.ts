type Attendance = {
  name: string;
  type: string;
  time: string;
};

export default function calculateWorkAndBreakTime(data: Attendance[]) {
  let workSeconds = 0;
  let breakSeconds = 0;

  for (let i = 0; i < data.length - 1; i++) {
    const current = data[i];
    const next = data[i + 1];

    const start = new Date(current.time).getTime();
    const end = new Date(next.time).getTime();

    const seconds = (end - start) / 1000;

    if (current.type === "IN" && next.type === "OUT") {
      workSeconds += seconds;
    } else if (current.type === "OUT" && next.type === "IN") {
      breakSeconds += seconds;
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs}s`;
  };

  return {
    workTime: formatTime(workSeconds),
    breakTime: formatTime(breakSeconds),
  };
}
