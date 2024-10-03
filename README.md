
# React Signature Pad

A lightweight, customizable signature pad component for React, built with TypeScript. Capture user signatures, save them as images, clear the pad, and optionally download them in various formats. Perfect for e-signatures and drawing applications.

## Features

- **Simple and Lightweight**: Easily capture user signatures.
- **Customizable**: Adjust pen color, canvas dimensions, icons, and more.
- **Cross-device Support**: Works with both mouse and touch events (desktop and mobile).
- **Save, Clear, and Download**: Save the signature, clear the pad, or download the signature as an image.
- **Stylable**: Customize the appearance of the signature pad and the icons for actions.

## Installation

Install the package using npm or yarn:

```bash
pnpm install react-signature-pad
```

## Usage

Import the component into your React project and use it as follows:

### Basic Usage

```tsx
import React, { useState } from 'react';
import SignaturePad from 'react-signature-pad';

const App: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);

  const handleSave = (dataURL: string) => {
    setSignature(dataURL); // Save the signature
  };

  return (
    <div>
      <h1>React Signature Pad</h1>
      <SignaturePad 
        width={500}
        height={300}
        penColor="black"
        onSave={handleSave}
        download={true}
        downloadFilename="my-signature"
        downloadFormat="image/png"
      />
      {signature && (
        <div>
          <h2>Your Signature:</h2>
          <img src={signature} alt="User signature" />
        </div>
      )}
    </div>
  );
};

export default App;
```

### Advanced Usage with Additional Features

```tsx
import React, { useState } from 'react';
import SignaturePad from 'react-signature-pad';

const App: React.FC = () => {
  const [signature, setSignature] = useState<string | null>(null);

  const handleSave = (dataURL: string) => {
    setSignature(dataURL); // Save the signature
  };

  return (
    <div>
      <h1>Advanced React Signature Pad</h1>
      <SignaturePad
        width={400}
        height={200}
        onCopy={handleSave} // Custom handler to save the signature
        downloadFormat="image/jpeg" // Specify download format
        onDownload={() => console.log("Downloaded")} // Callback for download
        onClear={() => console.log("Cleared")} // Callback for clearing the canvas
        download={true} // Enable download button
        padStyleClassName={{
          border: "1px solid #ccc",
          borderRadius: "10px",
        }} // Custom styling for the signature pad
        iconColor={{
          clear: "red",
          copy: "green",
          download: "blue",
        }} // Custom icon colors for actions
      />
    </div>
  );
};

export default App;
```

### Props

| Prop                | Type              | Default         | Description                                                                 |
| ------------------- | ----------------- | --------------- | --------------------------------------------------------------------------- |
| `width`             | `number`          | `500`           | Width of the canvas (in pixels).                                            |
| `height`            | `number`          | `300`           | Height of the canvas (in pixels).                                           |
| `penColor`          | `string`          | `'black'`       | Color of the pen for drawing signatures.                                    |
| `onSave`            | `function(dataURL: string)` | Required | Callback that receives the base64-encoded image data (signature).            |
| `onCopy`            | `function(dataURL: string)` | `undefined`    | Callback that fires when the signature is copied (similar to `onSave`).     |
| `onDownload`        | `function()`      | `undefined`     | Callback that triggers when the signature is downloaded.                    |
| `onClear`           | `function()`      | `undefined`     | Callback that triggers when the signature pad is cleared.                   |
| `download`          | `boolean`         | `false`         | Enables a download button to download the signature image.                  |
| `downloadFilename`  | `string`          | `'signature'`   | Default filename when downloading the signature.                            |
| `downloadFormat`    | `'image/png' \| 'image/jpeg'` | `'image/png'` | Format of the downloaded image (PNG or JPEG).                               |
| `padStyleClassName` | `object`          | `undefined`     | Custom styles for the signature pad (e.g., border, border radius).          |
| `iconColor`         | `object`          | `undefined`     | Customize the colors of the action icons (`clear`, `copy`, `download`).     |

## Development

If you want to contribute or make changes to the package:

1. Clone the repository:

   ```bash
   git clone https://github.com/unnikpanicker/react-signature-pad.git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm run dev
   ```

4. Build the package:

   ```bash
   pnpm run build
   ```

5. Test the package locally using a linked project:

   ```bash
   pnpm link
   ```

## License

This project is licensed under the MIT License.
