const codeBlocks = [
  {
    roomName: 'css1',
    title: 'Styling a Button',
    code: `.buttonaaa{
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }`,
  },
  {
    roomName: 'js',
    title: 'Fetching Data from an API',
    code: `(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log(data);
      })();`,
  },
  {
    roomName: 'html',
    title: 'Creating a Simple Form',
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Simple Form</title>
</head>
<body>
  <h1>Simple Form</h1>
  <form action="/submit">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <br>
    <button type="submit">Submit</button>
  </form>
</body>
</html>`,
  },
  {
    roomName: 'css2',
    title: 'Responsive Layout',
    code: `@media (max-width: 768px) {
        body {
          font-size: 14px;
        }
        h1 {
          font-size: 22px;
        }
      }`,
  },
];

export default codeBlocks;
