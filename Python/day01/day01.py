import os

current_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(current_dir, "../../challenges/day01/input.txt")

with open(file_path, "r") as file:
    lines = file.readlines()

left_list = []
right_list = []

for line in lines:
    formated_line = line.strip().split("   ")
    left_list.append(int(formated_line[0]))
    right_list.append(int(formated_line[1]))

def get_difference_part1(left_list, right_list): 
    sum = 0
    left_list.sort()
    right_list.sort()
    for i in range(len(left_list)):
        if left_list[i] > right_list[i]:
            sum += left_list[i] - right_list[i]
        else: 
            sum += right_list[i] - left_list[i]
    return sum

print(get_difference_part1(left_list, right_list))

def get_similarity_part2(left_list, right_list):
    sum = 0
    for i in range(len(left_list)):
        if left_list[i] in right_list:
            sum += left_list[i] * right_list.count(left_list[i])
    return sum

print(get_similarity_part2(left_list, right_list))