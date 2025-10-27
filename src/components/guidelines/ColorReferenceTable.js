import React from 'react';
import { getAllColorTokens } from '../../utils/tokenLoader';

const ColorReferenceTable = () => {
  const allTokens = getAllColorTokens();

  const ColorCircle = ({ hex }) => (
    <span
      style={{
        display: 'inline-block',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: hex,
        border: '1px solid #ccc',
        marginRight: '8px'
      }}
    ></span>
  );

  const renderColorRow = (category, categoryName, colors) => {
    if (!colors || colors.length === 0) return null;

    const rows = [];

    // Add category header
    rows.push(
      <tr key={`${category}-header`}>
        <td style={{ fontWeight: 'bold' }}>{categoryName}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );

    // Add color rows
    colors.forEach((color, index) => {
      const darkColor = allTokens.dark[category] ? allTokens.dark[category][index] : color;

      rows.push(
        <tr key={`${category}-${color.name}`}>
          <td><code>{color.name}</code></td>
          <td>
            <ColorCircle hex={color.hex} />
            <code>{color.hex}</code>
          </td>
          <td>
            <ColorCircle hex={darkColor.hex} />
            <code>{darkColor.hex}</code>
          </td>
          <td>{color.description}</td>
        </tr>
      );
    });

    return rows;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Color Token</th>
          <th>Light Theme</th>
          <th>Dark Theme</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {renderColorRow('accent', '**Accent Colors**', allTokens.light.accent)}
        {renderColorRow('surface', '**Surface Colors**', allTokens.light.surface)}
        {renderColorRow('text', '**Text Colors**', allTokens.light.text)}
        {renderColorRow('border', '**Border Colors**', allTokens.light.border)}
        {renderColorRow('feedback', '**Feedback Colors**', allTokens.light.feedback)}
        {renderColorRow('reserved', '**Reserved Colors**', allTokens.light.reserved)}
        {renderColorRow('webMarketing', '**Web/Marketing Colors**', allTokens.light.webMarketing)}
      </tbody>
    </table>
  );
};

export default ColorReferenceTable;