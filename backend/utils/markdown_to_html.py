import markdown

def markdown_to_html_file(markdown_text, output_filename):
    # Convert the Markdown text to HTML
    html_content = markdown.markdown(markdown_text)

    # Save the HTML content to a file
    with open(output_filename, 'w') as f:
        f.write(html_content)

    print(f"HTML file saved: {output_filename}")


if __name__ == "__main__":
    # Example usage
    markdown_text = """
    # Sample Markdown to HTML

    Here is some **bold text** and _italic text_.

    - Bullet point 1
    - Bullet point 2
    - Bullet point 3

    [A simple link](https://example.com)
    """

    output_filename = "output.html"
    markdown_to_html_file(markdown_text, output_filename)
