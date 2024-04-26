import markdown

def markdown_to_html_file(markdown_text):
    return markdown.markdown(markdown_text)

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

    print(markdown_to_html_file(markdown_text))
