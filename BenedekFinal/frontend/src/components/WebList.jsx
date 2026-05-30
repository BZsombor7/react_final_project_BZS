import WebItem from "./WebItem";

const WebList = ({ webData }) => {
  const safeData = Array.isArray(webData) ? webData : [];

  if (safeData.length === 0) {
    return <h2>Nincs megjeleníthető adat</h2>;
  }

  return (
    <div className="web-list">
      {safeData.map((item) => (
        <WebItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default WebList;