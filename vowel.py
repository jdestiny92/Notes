def anti_vowel(text):
	vowels = ["a","e","i","o","u"]
	chars = []
	
	for i in text:
	if i.lower() not in vowels:
	chars.append(i)

	return "".join(chars)

print anti_vowel("Hello there, how are you Julian?")
