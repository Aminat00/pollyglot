import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 justify-center p-5 items-center">
				<Text className="text-2xl">This screen doesn't exist.</Text>
				<Link href="/">
					<Text className="text-blue-500">Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}
